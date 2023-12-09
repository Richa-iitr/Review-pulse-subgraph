import { BigInt } from "@graphprotocol/graph-ts"
import {
  Universal,
  productReviewed,
  thresholdChanged
} from "../generated/Universal/Universal"
import { ProductState, ThresholdChanged } from "../generated/schema"

export function handleproductReviewed(event: productReviewed): void {
  let id = event.params.productId.toString()
  let entity = ProductState.load(id)
  if (!entity) { 
    entity = new ProductState(id)
    entity.countReviews = BigInt.fromI32(0)
  }

  entity.countReviews = entity.countReviews + BigInt.fromI32(1)

  entity.productId = event.params.productId
  let reviewers = entity.reviewers
  reviewers.push(event.params.sender)
  entity.reviewers = reviewers
  entity.save()
}

export function handlethresholdChanged(event: thresholdChanged): void {
  let entity = ThresholdChanged.load(BigInt.fromI32(0).toString())
  if(!entity) { 
    entity = new ThresholdChanged(BigInt.fromI32(0))
    entity.prevId = BigInt.fromI32(0)
    entity.threshold = event.params.threshold
    entity.save()
  } else {
    let id = BigInt.fromI32(entity.prevId.plus(BigInt.fromI32(1))).toString()
    let newEntity = new ThresholdChanged(id)
    newEntity.prevId = entity.prevId.plus(BigInt.fromI32(1))
    newEntity.threshold = event.params.threshold
    newEntity.save()
  }
}
